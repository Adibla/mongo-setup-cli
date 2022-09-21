<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![MIT License][license-shield]](https://opensource.org/licenses/MIT)
[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/andrea-di-blasi-888850b2/)



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Mongo Setup CLI</h3>

  <p align="center">
    <br />
    <a href="https://github.com/Adibla/mongo-setup-cli"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Adibla/mongo-setup-cli/issues">Report Bug</a>
    ·
    <a href="https://github.com/Adibla/mongo-setup-cli/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Example project for data initialization in Mongodb. It includes env management, logging with pino and a dockerfile to run this app containarized.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation with local clone

_Below is showed how to install this cli with local clone._

1. Clone project using git 
   ```sh
   git clone git@github.com:Adibla/mongo-setup-cli.git
   ```
2. Go to installation folder
    ```sh
   cd ./mongo-setup-cli
   ```
3. Install dependencies
   ```sh
   npm i
   ```
4. Run using node (in project root)
    ```sh
   node ./bin/
   ```
   OR
   
   ```sh
   npm link
   ```
   Then (in project root)
    ```sh
   mongo-setup-cli
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Set necessary ENV variables to specify MongoDB config
WINDOWS
 ```sh
  set DB_HOST="localhost"
  set DB_PORT=27017
  set DB_USER="test"
  set DB_PASS="test"
  set DB_NAME="test"
  set SERVICE_NAME="test" //for logging
   ```

OTHERS
 ```sh
  export DB_HOST="localhost"
  export DB_PORT=27017
  export DB_USER="test"
  export DB_PASS="test"
  export DB_NAME="test"
  export SERVICE_NAME="test" //for logging
   ```

Use the CLI (with npm installation) or execute file in projectDir/bin/index.js using node
   ```sh
   mongo-setup-cli
   ```

   or

  ```sh
   node ./bin/
   ```
   
   Make your selection, you can load data and schemas previously created, add new schema for your MongoDB, create data for an existing schema 
Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] First draft
- [x] Add Changelog
- [x] Add back to top links
- [ ] Autogenerate seeds data based on schema created
- [ ] Validate input based on attribute type (ex: default number cannot be string)
- [ ] Select default config file based on input in CLI
- [ ] Generate global package using tmp for store data
- [ ] Typescript migration
- [ ] Missing schemas types
- [ ] Manage errors in flow
- [ ] Migrations and versions actions
- [ ] WIP

See the [open issues](https://github.com/Adibla/mongo-setup-cli/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Andrea Di Blasi - [@linkedin](https://www.linkedin.com/in/andrea-di-blasi-888850b2/) - andrea.diblasix@gmail.com

Project Link: [https://github.com/Adibla/mongo-setup-cli](https://github.com/Adibla/mongo-setup-cli)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

 
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/mongo-setup-cli.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 