const albumMapDBToModel = ({ id, name, year, created_at, updated_at }) => ({
  id,
  name,
  year,
  createdAt: created_at,
  updatedAt: updated_at,
});

const getAlbumMapDBToModel = ({ id, name, year, songs, created_at, updated_at }) => ({
  id,
  name,
  year,
  songs,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = { albumMapDBToModel, getAlbumMapDBToModel };
