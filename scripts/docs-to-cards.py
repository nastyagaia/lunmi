# Тексты товаров из документов Word (из ChatGPT) → JSON в формате cosmetic_cards_master.json.
# Запуск (на Mac): python3 scripts/docs-to-cards.py "папка с .docx" scripts/cards
# Понимает два вида карточек:
#   «Название» / «Бренд · Тип · ID»            и    «ID  Название» / «Бренд: … | Категория: …»
# дальше заголовки ХАРАКТЕРИСТИКИ / СОСТАВ / ПРИМЕНЕНИЕ / О БРЕНДЕ / ИСТОЧНИКИ И ПРОВЕРКА.
import json
import pathlib
import re
import subprocess
import sys

TABS = {"ХАРАКТЕРИСТИКИ": "Характеристики", "СОСТАВ": "Состав", "ПРИМЕНЕНИЕ": "Применение", "О БРЕНДЕ": "О бренде"}
STOP = "ИСТОЧНИК"  # «ИСТОЧНИКИ И ПРОВЕРКА» или «ИСТОЧНИК И ПРОВЕРКА»


def parse(lines):
    cards = []
    for i, line in enumerate(lines):
        if line.strip() != "ХАРАКТЕРИСТИКИ" or i < 2:
            continue
        title, meta = lines[i - 2].strip(), lines[i - 1].strip()
        m = re.match(r"^([A-Z]+(?:-[A-Z]+)*-\d+)\s+(.*)$", title)
        if m:  # «AGE-01  AHC …» / «Бренд: AHC | Категория: …»
            cid, name = m.group(1), m.group(2)
            brand = re.search(r"Бренд:\s*([^|]+)", meta)
            cat = re.search(r"Категория:\s*(.+)$", meta)
            brand, cat = (brand.group(1).strip() if brand else ""), (cat.group(1).strip() if cat else "")
        else:  # «3CE Drop Glow Gel» / «3CE · Гель-блеск · MAKEUP-LIP-01»
            parts = [p.strip() for p in meta.split("·")]
            name, brand, cat, cid = title, parts[0], parts[1] if len(parts) > 1 else "", parts[-1]
        tabs, current, j = {}, None, i
        while j < len(lines):
            s = lines[j].strip()
            if s in TABS:
                current = TABS[s]
                tabs[current] = ""
            elif s.startswith(STOP):
                break
            elif current and s:
                tabs[current] = (tabs[current] + " " + s).strip()
            j += 1
        cards.append({"id": cid, "product_name": name, "brand": brand, "category": cat, "tabs": tabs})
    return cards


def main(src, out):
    out = pathlib.Path(out)
    out.mkdir(parents=True, exist_ok=True)
    for doc in sorted(pathlib.Path(src).glob("*.docx")):
        text = subprocess.run(
            ["textutil", "-convert", "txt", "-stdout", str(doc)], capture_output=True, text=True, check=True
        ).stdout
        cards = parse(text.splitlines())
        name = doc.stem.replace("Lunmi_карточки_", "").replace("_для_Claude", "")
        (out / f"{name}.json").write_text(json.dumps({"items": cards}, ensure_ascii=False, indent=2) + "\n")
        print(f"{name}: {len(cards)} карточек")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
