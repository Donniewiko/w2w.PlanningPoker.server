namespace w2w.PlanningPoker
{
   using System.Collections.Generic;
   using System.Linq;
   using System.Threading;
   using System.Threading.Tasks;

   using Microsoft.AspNet.SignalR;

   public class ServerHub : Hub
   {
      private static List<TeamMember> teamMembers { get; set; } 
      public void Hello()
      {
         Clients.All.hello();
      }

      public override Task OnConnected()
      {
         Clients.Caller.RegisterUser(Context.ConnectionId);

         return base.OnConnected();
      }

      public static bool RoundInProgress { get; set; }

      public void StartRound()
      {
         RoundInProgress = true;
         Clients.All.SessionInProgress(RoundInProgress);
         var membersThinking = true;
         while (membersThinking)
         {
            membersThinking = TeamMembers.Count != SubmittedCards.Count;
            Thread.Sleep(100);
         }

         Clients.All.ShowResults(SubmittedCards);
         RoundInProgress = false;
         Clients.All.SessionInProgress(RoundInProgress);
         
         submittedCards = null;
      }


      private static List<SubmittedCard> submittedCards;

      public static List<SubmittedCard> SubmittedCards
      {
         get
         {
            return submittedCards ?? (submittedCards = new List<SubmittedCard>());
         }
      }

      public void SubmitCard(string card)
      {
         var member = TeamMembers.SingleOrDefault(x => x.ConnectionID == Context.ConnectionId);
         if (member != null)
         {
            var submittedCard = new SubmittedCard { Card = card, ConnectionID = Context.ConnectionId };
            SubmittedCards.Add(submittedCard);
         }

         Clients.Caller.cardReceived();
      }

      public override Task OnDisconnected()
      {
         var currentUser = (from t in TeamMembers where t.ConnectionID == Context.ConnectionId select t).SingleOrDefault();
         if (currentUser != null)
         {
            teamMembers.Remove(currentUser);
         }

         return base.OnDisconnected();
      }

      public void InitTeamMemberList()
      {
         Clients.All.TeamMemberList(TeamMembers);
      }

      public override Task OnReconnected()
      {
         Clients.Caller.RegisterUser(Context.ConnectionId);

         return base.OnReconnected();
      }

      public void RegisterTeamMember(string userName, bool dashboard, string connectionID)
      {
         if (!dashboard)
         {
            var teamMember = new TeamMember { ConnectionID = connectionID, Name = userName };

            TeamMembers.Add(teamMember);

            // update the member list
            this.InitTeamMemberList();
         }
         Clients.Caller.ProceedLogin(dashboard);
      }

      public void GetCards()
      {
         var member = TeamMembers.SingleOrDefault(x => x.ConnectionID == Context.ConnectionId);
         if (member != null)
         {
            Clients.Caller.SubmitCards(member.PokerCards);
         }
      }

      private static List<TeamMember> TeamMembers
      {
         get
         {
            return teamMembers ?? (teamMembers = new List<TeamMember>());
         }
      } 
   }

   public class SubmittedCard
   {
      public string Card { get; set; }

      public string ConnectionID { get; set; }
   }
}