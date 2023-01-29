using System.Web.Http;

namespace FinanceTracker;

public class WebConfig
{
    public static void Register(HttpConfiguration config)
    {
        config.MapHttpAttributeRoutes();
    }
}