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
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    clairvoyance:dev
```

FOR DOCKER-COMPOSE --> WILL SET UP SWARM SOON

```bash
docker-compose up -d --build
```