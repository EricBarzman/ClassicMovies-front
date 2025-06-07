import { useEffect } from "react"

export default function Terms_of_use() {
  useEffect(()=> {
    document.title = `Terms of Use | Retrocine`;
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="p-20">
      
      <h2 className="text-3xl font-bold">Terms of Use</h2>
      <h4 className="mt-8 mb-6 text-xl">Classic Movies offers a subscription service to access classics movies to watch.</h4>
      <br />
      <h2 className="text-xl font-semibold mb-10">Here are the conditions of use.</h2>
      
      <div className="ml-4 mb-6">
        <h3 className="font-semibold mb-4">1. Subscription</h3>
        <ol className="ml-6">
          <li className="mb-4">1.1 Your subscription lasts until you cancel it. To use ClassicMovies, you need access to internet and a compatible device</li>
          <li className="mb-4">1.2 Several offers exist. Some contain advertising. Some do not.</li>
        </ol>
      </div>

      <div className="ml-4 mb-6">
        <h3 className="font-semibold mb-4">2. Billing and cancelling</h3>
        <ol className="ml-6">
          <li className="mb-4">2.1 Billing cycle: every month, starting on the date you subscribed in the first place.</li>
          <li className="mb-4">2.2 Billing options: to use ClassicMovies, you must provide payment options. You authorize us to bill you through any of these in case your main payment option does not work.</li>
        </ol>
      </div>

      <div className="ml-4 mb-6">
        <h3 className="font-semibold mb-4">3. Services</h3>
        <ol className="ml-6">
          <li className="mb-4">3.1 Your subscription lasts until you cancel it. To use ClassicMovies, you need access to internet and a compatible device</li>
        </ol>
      </div>

    </div>
  )
}
