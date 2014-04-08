namespace w2w.PlanningPoker
{
   using Microsoft.AspNet.SignalR;
   using Microsoft.Owin;
   using Owin;

   public class Startup
   {
      public void Configuration(IAppBuilder app)
      {

         app.MapSignalR(new HubConfiguration { EnableJSONP = true });
      }
   }
}