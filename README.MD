<p align="center">
  <img src="https://web-gdgoc-ipb.vercel.app/assets/images/gdgoc.png" alt="GDGOC IPB Logo" width="150"/>
</p>

<h1 align="center">
  Model Context Protocol SERVER - IPB COMMUNITY
</h1>

<p align="center">
  <strong>Version 1.0.0</strong>
</p>

---

## 📝 Deskripsi

Proyek ini dikembangkan dengan tujuan untuk mempererat dan memperluas pengaruh komunitas di lingkungan IPB University. Misi utamanya adalah membangun jembatan integrasi antara komunitas IPB dengan teknologi terdepan seperti Artificial Intelligence (AI), Large Language Models (LLM), dan AI Agents melalui Model Context Protocol (MCP).

Dengan menyediakan akses yang mudah terhadap tools canggih ini, kami berupaya meningkatkan kualitas dan kapabilitas komunitas, khususnya dalam bidang teknologi informasi (TI), serta membuka peluang baru untuk kolaborasi dan inovasi di kalangan mahasiswa.

---

## 🧑‍💻 Kontributor

Daftar nama anggota tim yang berkontribusi dalam pengembangan proyek ini.

| Nama                 | Peran                   | GitHub                                   |
| -------------------- | ----------------------- | ---------------------------------------- |
| Ekky Mulia Lasardi   | GDGOC IPB 24/25 Cpt. Lead | [@ekkymulia](https://github.com/ekkymulia) |

---

## 🚀 Cara Menjalankan Aplikasi

Berikut adalah langkah-langkah untuk menjalankan proyek ini secara lokal.

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/GDG-on-Campus-IPB-University/ipb-community-mcp-server.git](https://github.com/GDG-on-Campus-IPB-University/ipb-community-mcp-server.git)
    ```

2.  **Set up local mcp client (cth: Claude Desktop)**
    - Install via Website Claude Desktop
    - Download sesuai OS
    - Install
    - Buka Settings > Developer > Edit Config

3.  **Masukkan Konfigurasi Berikut ke Claude**
    ```bash
    {
        "mcpServers": {
            "ipb-community": {
                "command": "node",
                "args": [
                    "[ROOT PATH]/ipb-community-mcp/build/index.js"
                ]
            }
        }
    }
    ```
    - Pastikan merubah kata [ROOT PATH] menjadi folder tempat clone repository
    contoh: Jika repository diletakkan di desktop (WINDOWS: C:\Users\USERNAME\Desktop, MAC: /Users/USERNAME/Desktop)
    - Restart Aplikasi Claude Desktop

4.  **Allow MCP**
    - Pada Bubble Input Chat AI disamping tombol upload file, tekan tombol setting, pastikan ada tools ipb-community-service
    - Jika ada, nyalakan seluruh tools
    - Jika tidak ada, Install tidak berhasil, silahkan ulangi step-step.

5.  **Mulai Chat**
    Install telah berhasil sepenuhnya, dapat mulai chat/interaksi dengan MCP Tools

---

## 💡 Fitur & Penggunaan

1.  **GDGOC IPB COMMUNITY SERVICE:**
    - Daftar & Check Member Keanggotaan GDGOC IPB
    - List Event GDGOC IPB
    - Pengenalan Mengenai GDG, GDGOC, GDGOC IPB
2.  **IPB COMMUNITY SERVICE (UNOFFICIAL):**
    - Bertanya Seputar Peraturan di IPB dengan Retrieval Augmented Generation (RAG)

### Upcoming Updates
1. **IPB ORGANIZATION INTEGRATION:**
    - Informasi Mengenai Organisasi di IPB
    - Informasi Event Organisasi di IPB
2. **IPB COMMUNITY PLATFORM INTEGRATION:**
    - Integrasi Dengan Akun Menfess & Komunitas Lainnya di IPB

---


