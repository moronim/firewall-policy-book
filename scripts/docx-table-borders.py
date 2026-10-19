"""Writes cell borders directly onto every table in a .docx.

Word draws them from the table style in scripts/reference.docx, but Google Docs
and some other editors ignore table styles, so the forms would lose their boxes.
Usage: python3 scripts/docx-table-borders.py file.docx
"""
import os
import sys
import zipfile

B = 'w:sz="4" w:space="0" w:color="A6A6A6"'
BORDERS = (
    '<w:tblBorders>'
    + ''.join(f'<w:{side} w:val="single" {B}/>' for side in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'))
    + '</w:tblBorders>'
)

path = sys.argv[1]
tmp = path + '.tmp'
with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == 'word/document.xml':
            data = data.decode().replace('<w:tblStyle w:val="Table" />', '<w:tblStyle w:val="Table" />' + BORDERS).encode()
        zout.writestr(item, data)
os.replace(tmp, path)
