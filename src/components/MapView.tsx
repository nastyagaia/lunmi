"use client";

// Карта для выбора адреса (Figma: courier address / pick up point) — OpenStreetMap через Leaflet:
// бесплатно, без ключей и аккаунтов. Подложка обесцвечена до светло-серой, метки — тёмные булавки,
// выбранная — розовая, с белой плашкой-подписью, как в макете. Клик по карте сообщает координаты (onMapClick).
import "leaflet/dist/leaflet.css";
import type { LayerGroup, Map as LeafletMap } from "leaflet";
import { useEffect, useRef } from "react";

export type MapMarker = { id: string; lat: number; lng: number; label?: string };

const PIN = (color: string) =>
  `<svg width="28" height="36" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 35s12-12.1 12-21A12 12 0 0 0 2 14c0 8.9 12 21 12 21Z" fill="${color}" stroke="#fff" stroke-width="2"/><circle cx="14" cy="14" r="4.5" fill="#fff"/></svg>`;

const escape = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export function MapView({
  center,
  zoom = 15,
  markers,
  activeId,
  onSelect,
  onMapClick,
}: {
  center: [number, number];
  zoom?: number;
  markers: MapMarker[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onMapClick?: (lat: number, lng: number) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const layer = useRef<LayerGroup | null>(null);
  // свежие обработчики без пересоздания карты
  const handlers = useRef({ onSelect, onMapClick });
  useEffect(() => {
    handlers.current = { onSelect, onMapClick };
  });

  // карта создаётся один раз; Leaflet подгружается только в браузере
  useEffect(() => {
    let cancelled = false;
    let resize: ResizeObserver | undefined;
    import("leaflet").then((L) => {
      if (cancelled || !box.current || map.current) return;
      const m = L.map(box.current, { zoomControl: false, attributionControl: true }).setView(center, zoom);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        className: "map-tiles-grey",
      }).addTo(m);
      L.control.zoom({ position: "bottomright" }).addTo(m);
      // подпись внизу: только обязательное «© OpenStreetMap», без префикса Leaflet с флажком
      m.attributionControl.setPrefix(false);
      m.on("click", (e) => handlers.current.onMapClick?.(e.latlng.lat, e.latlng.lng));
      layer.current = L.layerGroup().addTo(m);
      map.current = m;
      drawMarkers(L);
      // окно расширили и карта появилась — пересчитываем её размер
      resize = new ResizeObserver(() => m.invalidateSize());
      resize.observe(box.current);
    });
    return () => {
      cancelled = true;
      resize?.disconnect();
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- создаём карту один раз, дальше двигаем её отдельно
  }, []);

  function drawMarkers(L: typeof import("leaflet")) {
    const group = layer.current;
    if (!group) return;
    group.clearLayers();
    for (const mk of markers) {
      const active = mk.id === activeId;
      const label = active && mk.label ? `<span class="map-label">${escape(mk.label)}</span>` : "";
      const icon = L.divIcon({
        className: "map-pin",
        html: `<span class="map-pin-inner">${PIN(active ? "#f04a97" : "#292929")}${label}</span>`,
        iconSize: [28, 36],
        iconAnchor: [14, 35],
      });
      const marker = L.marker([mk.lat, mk.lng], {
        icon,
        zIndexOffset: active ? 1000 : 0,
        keyboard: true,
        title: mk.label,
      });
      marker.on("click", () => handlers.current.onSelect?.(mk.id));
      group.addLayer(marker);
    }
  }

  // метки и центр меняются — перерисовываем и плавно двигаем карту
  // сравниваем по содержимому: новый массив с теми же метками — не повод перерисовывать
  const markersKey = JSON.stringify(markers);
  useEffect(() => {
    if (!map.current) return;
    import("leaflet").then((L) => drawMarkers(L));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- drawMarkers читает актуальные markers/activeId
  }, [markersKey, activeId]);

  const [lat, lng] = center;
  useEffect(() => {
    const m = map.current;
    if (!m || !Number.isFinite(lat) || !Number.isFinite(lng)) return;
    // карта скрыта (узкий экран) — у неё нулевой размер, и плавный перелёт ломается: просто встаём в точку
    const { x, y } = m.getSize();
    if (x > 0 && y > 0) m.flyTo([lat, lng], zoom, { duration: 0.6 });
    else m.setView([lat, lng], zoom, { animate: false });
  }, [lat, lng, zoom]);

  return <div ref={box} className="size-full bg-surface" aria-label="Карта" role="region" />;
}
