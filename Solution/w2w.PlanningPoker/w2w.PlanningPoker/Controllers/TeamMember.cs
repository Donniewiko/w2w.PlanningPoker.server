namespace w2w.PlanningPoker
{
   using System.Collections.Generic;

   public class TeamMember
   {
      public TeamMember()
      {
         PokerCards = GetPokerCards();
      }

      public string Name { get; set; }

      public string ConnectionID { get; set; }

      public Card SelectedCard { get; set; }

      public List<Card> PokerCards { get; private set; }


      private static List<Card> GetPokerCards()
      {
         return new List<Card>
                   {
                      new Card { StoryPoints = "0", Description = "Geen punten" },
                      new Card { StoryPoints = "0.5", Description = "Halve storypoint" },
                      new Card { StoryPoints = "-1", Description = "Koffie kaart" },
                      new Card { StoryPoints = "-2", Description = "Vraagteken" },
                      new Card { StoryPoints = "1", Description = "Een story point" }
                   };
      }
   }
}