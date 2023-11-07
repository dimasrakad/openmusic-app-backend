const { nanoid } = require("nanoid");
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class MusicsService {
  constructor() {
    this._musics = [];
  }

  addMusic({ title, year, genre, performer, duration, albumId }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newMusic = {
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
      id,
      createdAt,
      updatedAt,
    };

    this._musics.push(newMusic);

    const isSuccess =
      this._musics.filter((music) => music.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Musik gagal ditambahkan');
    }

    return id;
  }

  getMusics() {
    return this._musics;
  }

  getMusicById(id) {
    const music = this._musics.filter((a) => a.id === id)[0];

    if (!music) {
      throw new NotFoundError('Musik tidak ditemukan');
    }
    return music;
  }

  editMusicById(id, { title, year, genre, performer, duration, albumId }) {
    const index = this._musics.findIndex((music) => music.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui musik. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._musics[index] = {
      ...this._musics[index],
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
      updatedAt,
    };
  }

  deleteMusicByIdHandler(id) {
    const index = this._musics.findIndex((music) => music.id === id);

    if (index === -1) {
      throw new NotFoundError('Musik gagal dihapus. Id tidak ditemukan');
    }

    this._musics.splice(index, 1);
  }
}

module.exports = MusicsService;
