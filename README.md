Lectet web application - [[089318] Hypermedia Applications course](https://www11.ceda.polimi.it/schedaincarico/schedaincarico/controller/scheda_pubblica/SchedaPublic.do?&evn_default=evento&c_classe=691294&__pj0=0&__pj1=42dd37a872b1e163a2110d5ef6b528cc) - Politecnico di Milano


# Dependencies
- npm version 6.7.0
- Node.js version 11.10.1

# Installation

```shell
git clone https://github.com/VictorJuez/lectet.git
cd lectet
npm install
sudo npm i -g nodemon (to run the appliction without restarting everytime)
```

In order to run the application:

```shell
npm start
```

# Project Structure

Followed the [Fractal - NodeJS app structure](
https://codeburst.io/fractal-a-nodejs-app-structure-for-infinite-scale-d74dda57ee11)

```shell
    lectet
    ├── app                     # Main app code (Back-end)
    │   ├── actions             # Business logic, DB calls
    │   ├── routes              # Routes to project entities
    │   ├── helpers             # Helpers and Config files
    │   ├── static-files        # Main point for the Front-end
    │   ├── swagger.json        # Swagger documentation file
    │   └── server.js           # Server starting point
    └── docs                    # Documentation purpose
```

# Links to the Application
- Web Application: https://lectet.herokuapp.com/
- API Documentation: https://lectet.herokuapp.com/api-docs

# Members
- Julian
- Arnab
- Víctor Juez
