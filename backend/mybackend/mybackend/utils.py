# utils.py
import os
import tempfile
from docx2pdf import convert

import subprocess

def generar_pdf_desde_docxlinux(docx_path):
    pdf_path = docx_path.replace(".docx", ".pdf")
    subprocess.run(['libreoffice', '--headless', '--convert-to', 'pdf', '--outdir', os.path.dirname(docx_path), docx_path])
    return pdf_path


def generar_pdf_desde_docx(docx_path):
    pdf_path = docx_path.replace(".docx", ".pdf")
    convert(docx_path, pdf_path)
    return pdf_path
