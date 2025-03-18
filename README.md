<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ArchangeLillith/knitters-fren">
    <img src="/public/images/Nanachi-logo.png" alt="Logo" width="250" height="250">
  </a>

  <h3 align="center">Knitters Fren</h3>

  <p align="center">
    A place for knitters to share their creations and patterns!
    <br />
    <a href="https://github.com/ArchangeLillith/knitters-fren"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#gallery">Gallery</a></li>
    <li><a href="#for-developers">For Developers</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#license">License</a></li>
  </ul>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="/public/images/screenshots/home-view.png" alt="home page screenshot" width="1000" height="500">

This project was originally a blog post, but I felt that was less fun than making a functional website to host all my favorite knitting patterns! Under the hood it's very similar to a blog website having users, posts, tags but also incorporates those in more advanced ways - like the search function. The search function allows users to click a tag tile and be transported to the search with that tag already selected. The user can also select more tags and also search with plain text! 


I'm hoping that the more organized my patterns are, the more I and other knitters want to knit fun things.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
<div align="center">

[![React][React.js]][React-url]
[![Bootstrap][Bootstrap.com]][Bootstrap-url]
[![nodejs][nodejs]][nodejs-url]
[![express][express]][express-url]
[![Passport][Passport]][Passport-url]
[![JWT][JSON-web-tokens]][JSON-web-tokens-url]
[![MySQL][MySQL]][MySQL-url]
[![S3][S3]][S3-url]
[![bcrypt][bcrypt]][bcrypt-url]
[![js-cookie][js-cookie]][js-cookie-url]
[![cors][cors]][cors-url]
[![esbuild][esbuild]][esbuild-url]
[![eslint][eslint]][eslint-url]
[![dayjs][dayjs]][dayjs-url]
[![vite][vite]][vite-url]

</div>

While much of this tech stack is my bread and butter, this project challenged me to step out of my comfort zone and grow as a developer. I focused on writing clean SQL queries that return exactly what I need, adding bcrypt and JWT to ensure the safety of my application and leaning on a custom, beefy eslint setup that kept me to a high standard of clean code. I approached React differently, using components much more thoughtfully. The scale of the project demanded I adopt compartmentalized logic, which led to cleaner, more maintainable code and significantly reduced time spent tracking down issues.

Bootstrap was the one tech I wasn't very familier with. I've used it a touch, but had always fallen back to writng all my CSS by hand. However, I challenged myself to style the entire site using only Bootstrap, knowing it's a widely used industry tool. I also saw it's value, knowing it would save me a lot of time. Other than some miniscule overrides - color, some small styling tweaks - this website uses only Bootstrap. Through that decision, I have a much deeper understanding of Bootstrap's system. I'm incredibly glad I learned CSS 'the hard way' first so I better understand how the classes affect and change the elements they're applied to. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Deployment
<div align="center">
To explore Knitters Fren, go see it in action: 
  <br/>
  <br/>
  
  [![knitters-fren][knitters-fren]][knitters-fren-url]
  
</div>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

I've found it challenging to know which of my patterns I'm looking for based on file name alone, and sometimes I forget I have a really pretty pattern I haven't used in a while. I'm hoping with the addition of pictures that I can more easily find what I'm looking for, and with the featured section rotating on every load I'll be exposed to more patterns!
<br/>
<br/>
As this website gains more users, I'm also hoping I can make a positive enviornment that people can share wonderful patterns they've used and it becomes a place that knitters can find wonderful new patterns to try.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
- [x] Create the base of the site with CRUD functionality
- [x] Add styling
- [x] Add search functionality
- [ ] Allow the addition of images
    - [ ] Add the gallery and allow submissions of finished works


See the [project board](https://github.com/users/ArchangeLillith/projects/1) for a full list of intended features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GALLERY -->
## Gallery
Explore the pages of KnittersFren below through images!

<details open>
  <summary>🏠 Home View</summary>
 <img src="/public/images/screenshots/home-view.png" alt="home view of knitter fren" width="1000" height="500">
</details>

<details>
  <summary>📜 All Patterns List</summary>
 <img src="/public/images/screenshots/all-patterns-list.png" alt="all patterns in a list view" width="1000" height="500">
</details>

<details>
  <summary>🧵 Create a New Pattern</summary>
  <img src="/public/images/screenshots/create-a-pattern.png" alt="create a pattern form view" width="1000" height="500">
</details>

<details>
  <summary>🖼️ Detail View</summary>
  <img src="/public/images/screenshots/updated-detail-view.png" alt="details page screenshot" width="1000" height="500">
</details>

<details>
  <summary>🔑 Login</summary>
 <img src="/public/images/screenshots/login-page.png" alt="login page form view" width="1000" height="500">
</details>

<details open>
  <summary>✏️ Register</summary>
 <img src="/public/images/screenshots/register-page.png" alt="register page form view" width="1000" height="500">
</details>

<details>
  <summary>🔍 Search View</summary>
  <img src="/public/images/screenshots/search-view.png" alt="saerch view with search active to show return pattern card" width="1000" height="500">
</details>

<details>
  <summary>❌ Not Found Page</summary>
 <img src="/public/images/screenshots/404-page.png" alt="404 page with gif of nanachi" width="1000" height="500">
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!--DEV -->
### For Developers

If you'd like to run a local copy of this project, please follow the steps below to do so!

1. Clone the repo
   ```sh
   git clone https://github.com/ArchangeLillith/knitters-fren
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Boot the project (backend lives on localhost:3000, frontend lives on localhost:8000)
    ```sh
   npm run dev
   ```

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Thank you to Elivaras who's been helping me learn version control and keeping my code clean by reviewing most of my commits! And thank you to [Covalence](https://covalence.io/) for their incredible support and amazing lectures (looking at you Luke and Andrew!)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[knitters-fren]: https://img.shields.io/badge/live_site!-f89090?style=for-the-badge
[knitters-fren-url]: https://arias-server-4642dbc777af.herokuapp.com/
[vite]: https://img.shields.io/badge/vite-8A89FF?style=for-the-badge&logo=vite&logoColor=DAA520
[vite-url]: https://vite.dev/
[dayjs]: https://img.shields.io/badge/dayjs-FF6347?style=for-the-badge
[dayjs-url]: https://day.js.org/
[esbuild]: https://img.shields.io/badge/esbuild-F4C430?style=for-the-badge&logo=esbuild&logoColor=000000
[esbuild-url]: https://esbuild.github.io/
[eslint]: https://img.shields.io/badge/eslint-A78BFA?style=for-the-badge&logo=eslint&logoColor=000000
[eslint-url]: https://eslint.org/
[cors]: https://img.shields.io/badge/CORS-E8A87C?style=for-the-badge&logo=c&logoColor=8B4000
[cors-url]: https://github.com/expressjs/cors
[js-cookie]: https://img.shields.io/badge/JS_Cookie-D2B48C?style=for-the-badge&logo=javascript&logoColor=8B4513
[js-cookie-url]: https://www.npmjs.com/package/js-cookie
[bcrypt]: https://img.shields.io/badge/bcrypt-90EE90?style=for-the-badge&logo=bloglovin&logoColor=2A9D8F
[bcrypt-url]: https://github.com/kelektiv/node.bcrypt.js
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[nodejs]: https://img.shields.io/badge/node.js-d8e3db?style=for-the-badge&logo=nodedotjs&logoColor=#fffffff
[nodejs-url]: https://nodejs.org/en
[express]: https://img.shields.io/badge/express-c3c6c7?style=for-the-badge&logo=express&logoColor=##9ccce6
[express-url]:https://expressjs.com/
[Passport]: https://img.shields.io/badge/Passport-4e5052?style=for-the-badge&logo=passport&logoColor=#62e371
[Passport-url]: https://www.passportjs.org/
[JSON-web-tokens]:https://img.shields.io/badge/JSON_Web_Tokens-6fd1cb?style=for-the-badge&logo=jsonwebtokens&logoColor=#fffffff
[JSON-web-tokens-url]: https://jwt.io/
[MySQL]: https://img.shields.io/badge/MySQL-ffffff?style=for-the-badge&logo=mysql&logoColor=#fffffff
[MySQL-url]: https://www.mysql.com/
[S3]: https://img.shields.io/badge/Amazon_S3-e5e5e5?style=for-the-badge&logo=amazon-s3
[S3-url]: https://aws.amazon.com/pm/serv-s3/?gclid=EAIaIQobChMIzbHh-_XgiAMVci2tBh0TGjcJEAAYASAAEgL-KvD_BwE&trk=936e5692-d2c9-4e52-a837-088366a7ac3f&sc_channel=ps&ef_id=EAIaIQobChMIzbHh-_XgiAMVci2tBh0TGjcJEAAYASAAEgL-KvD_BwE:G:s&s_kwcid=AL!4422!3!536324434071!e!!g!!amazon%20s3!11346198420!112250793838
