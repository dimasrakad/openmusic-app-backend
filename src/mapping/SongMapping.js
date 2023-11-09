const songMapDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
  createdAt: created_at,
  updatedAt: updated_at,
});

const getSongsMapDBToModel = ({ id, title, performer }) => ({
  id,
  title,
  performer,
});

module.exports = { songMapDBToModel, getSongsMapDBToModel };
