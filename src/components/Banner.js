function Banner({img, title }) {
  return (
    <div className="banner">
        <img src={img} alt={title} />
    </div>
  )
}

export default Banner