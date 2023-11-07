class MusicsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postMusicHandler = this.postMusicHandler.bind(this);
    this.getMusicsHandler = this.getMusicsHandler.bind(this);
    this.getMusicByIdHandler = this.getMusicByIdHandler.bind(this);
    this.putMusicByIdHandler = this.putMusicByIdHandler.bind(this);
    this.deleteMusicByIdHandler = this.deleteMusicByIdHandler.bind(this);
  }

  postMusicHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload);
      const {
        title = "untitled",
        year,
        genre,
        performer,
        duration,
        albumId,
      } = request.payload;

      const musicId = this._service.addMusic({
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
      });

      const response = h.response({
        status: "success",
        message: "Musik berhasil ditambahkan",
        data: {
          musicId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  getMusicsHandler() {
    const musics = this._service.getMusics();
    return {
      status: "success",
      data: {
        musics,
      },
    };
  }

  getMusicByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const music = this._service.getMusicById(id);
      return {
        status: "success",
        data: {
          music,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  putMusicByIdHandler(request, h) {
    this._validator.validateNotePayload(request.payload);
    try {
      const { id } = request.params;

      this._service.editNoteById(id, request.payload);

      return {
        status: "success",
        message: "Musik berhasil diperbarui",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  deleteMusicByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteMusicById(id);
      return {
        status: "success",
        message: "Musik berhasil dihapus",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = MusicsHandler;
