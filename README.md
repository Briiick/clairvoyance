# Clairvoyance

<b>Client – WHERE THE MAGIC HAPPENS SO FAR</b>

<ul>
  <li>React.js</li>
  <li>Redux & React-Redux</li>
  <li>Formik</li>
  <li>Bootstrap</li>
</ul>

<b>Old Server is made out of:</b>

<ul>
  <li>Express.js</li>
  <li>MongoDB</li>
  <li>Yup.js</li>
</ul>

but we plan to use:

- Django

## To RUN:

cd into Client and run:

FOR DOCKERFILE:

```bash
docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3000:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    clairvoyance:dev
```

FOR DOCKER-COMPOSE --> WILL SET UP SWARM SOON

```bash
docker-compose up -d --build
```

- Uses -d for not displaying logs.
- Use -f logs to display logs of a container.

TESTING IN CONTAINER:

```
docker-compose run \
 -e DJANGO_SETTINGS_MODULE=clairvoyance.settings.settings_test \
 --no-deps --rm backend py.test;
```

- Uses -e for passing a new environment variable, this starts the application with that djangodocker.settings.testing settings.
- Uses --no-deps for avoiding to start MySQL service. See run for more details (docs here).
- Uses --rm for removing the container when the tests are finished.
- app references our application (a.k.a. service) in docker-compose. So we are saying we want to start a new process from this service.
- py.test is the command to be run in our service.

RUNNING BACKEND:

```
docker-compose up backend
docker-compose run backend bash
python manage.py makemigrations
python manage.py migrate
```

- This will setup your backend and run the migrations for the data models. To access any of the endpoints go to localhost:8000 and you will be prompted with options.
- The first step will be login so head over to localhost:8000/api/v1/accounts/login/ and send a post request with a email and password (e.g., in Postman).
- To retrieve any data checkout localhost:8000/api/v1/ for possible options.
