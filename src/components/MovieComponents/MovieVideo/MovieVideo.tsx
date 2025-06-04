
function MovieVideo({ youtube_id }: { youtube_id: string }) {
  return (
    <div className="video-container mx-auto">
      <iframe
        src={`https://www.youtube.com/embed/${youtube_id}`}
        width="70%"
        height="600"
        className="w-full"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen>
      </iframe>
    </div>
  )
}

export default MovieVideo