const Hapi = require("@hapi/hapi");
const albums = require("./api/albums");
const AlbumsService = require("./services/inMemory/AlbumsService");
const AlbumsValidator = require("./validator/albums");
const musics = require("./api/musics");
const MusicsService = require("./services/inMemory/MusicsService");
const MusicsValidator = require("./validator/musics");

const init = async () => {
  const albumsService = new AlbumsService();
  const musicsService = new MusicsService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register({
    plugin: albums,
    options: {
      service: albumsService,
      validator: AlbumsValidator,
    },
  });

  await server.register({
    plugin: musics,
    options: {
      service: musicsService,
      validator: MusicsValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
