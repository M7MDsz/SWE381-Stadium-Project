import { Link } from 'react-router-dom';

function StadiumCard({ stadium }) {
  const firstPhoto = stadium.photos && stadium.photos.length > 0 ? stadium.photos[0] : '';
  const availableCount = stadium.slots ? stadium.slots.filter((slot) => !slot.isReserved).length : 0;

  return (
    <div className="card h-100 shadow-sm">
      {firstPhoto && <img src={firstPhoto} className="card-img-top stadium-photo" alt={stadium.name} />}
      <div className="card-body">
        <h5 className="card-title">{stadium.name}</h5>
        <p className="card-text text-muted">{stadium.location}</p>
        <p className="card-text">{stadium.description}</p>
        <p className="small">Available slots: <strong>{availableCount}</strong></p>
        <Link className="btn btn-success" to={`/stadiums/${stadium._id}`}>View Details</Link>
      </div>
    </div>
  );
}

export default StadiumCard;
