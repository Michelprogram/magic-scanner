<div id="top"></div>



<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="./frontend/public/pwa-512x512.png" alt="Logo" width="80" height="80">

<h3 align="center">Scan cards of Magic the gathering</h3>

  <p align="center">Backend api using golang, with api Scryfall and OCR vision from google cloud.</p>
</div>

 <br />  

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">🧭 About The Project</a>
      <ul>
        <li><a href="#built-with">🏗️ Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">📋 Getting Started</a>
      <ul>
        <li><a href="#prerequisites">🗺️ Prerequisites</a></li>
        <li><a href="#installation">⚙️ Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">💾 Usage</a></li>
    <li><a href="#contributing">🔗 Contributing</a></li>
    <li><a href="#license">📰 License</a></li>
    <li><a href="#contact">📫 Contact</a></li>
    <li><a href="#acknowledgments">⛱️ Acknowledgments</a></li>
  </ol>
</details>

<br>



<!-- ABOUT THE PROJECT -->
## 🧭 About The Project

### 🏗️ Built With

List of technologies / frameworks used during the project.

* [![Heroku Badge](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://dashboard.heroku.com/)
* [![Google cloud Badge](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/?hl=fr)
* [![Go Badge](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://go.dev/)
* [![React Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://fr.reactjs.org/)
* [![Tailwind Badge](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) 
* 🐋 Docker

<p align="right"><a href="#top">⬆️</a></p>




<!-- GETTING STARTED -->
## 📋 Getting Started

The concept of this project is to scan magic card from your phone and save it into notion.

### 🗺️ Prerequisites

You need node 18 and Go 1.19 for running this project.

Get Nodejs at this url : https://nodejs.org/en/download/

Get Golang at this url : https://go.dev/doc/install

Also you need to create **.env** at the backend/server folder project :

```bash
NOTION_TOKEN=key
VISION_TOKEN=key
```

This tokens could be found here for <a href="https://developers.notion.com/docs/create-a-notion-integration">Notion Token</a> and here for <a href="https://cloud.google.com/vision/docs/drag-and-drop?hl=fr">OCR Vision</a>.

The backend is hosted on heroku and the frontend on vercel.


<p align="right"><a href="#top">⬆️</a></p>


<!-- USAGE EXAMPLES -->
## 💾 Usage

Run the backend :

```bash
$bash : cd frontend
$bash : pnpm run dev:backend
```

The frontend can be run with http or https, in local to acces webcam need https :

```bash
$bash : pnpm run dev:http #http
$bash : pnpm run dev:https #https
```

<p align="right"><a href="#top">⬆️</a></p>


<!-- CONTRIBUTING -->
## 🔗 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right"><a href="#top">⬆️</a></p>




<!-- LICENSE -->
## 📰 License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right"><a href="#top">⬆️</a></p>




<!-- CONTACT -->
## 📫 Contact

Reach me at : gauron.dorian.pro@gmail.com.

Project Link: [https://github.com/Michelprogram/magic-scanner.git](https://github.com/Michelprogram/magic-scanner.git)

<p align="right"><a href="#top">⬆️</a></p>




<!-- ACKNOWLEDGMENTS -->
## ⛱️ Acknowledgments

This space is a list to resources i found helpful and would like to give credit to.

* Scryfall https://scryfall.com/docs/api/cards/search
* Shadcn https://ui.shadcn.com/docs/installation
  
<p align="right"><a href="#top">⬆️</a></p>

<a href="https://github.com/othneildrew/Best-README-Template">Template inspired by othneildrew</a>