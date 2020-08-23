using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalR
{
    public class VoteHube : Hub
    {
        static List<Vote> votes = new List<Vote>();
        public async Task SendVote(string groupName)
        {
            var vote = votes.FirstOrDefault(x => x.Key == groupName);
            if (vote != null)
            {
                vote.Value++;
            }
            else
            {
                Vote newVote = new Vote()
                {
                    Key = groupName,
                    Value = 1
                };
                votes.Add(newVote);
            }
            await Clients.All.SendAsync("ReciveVote", votes);
        }
    }
    class Vote
    {
        public string Key { get; set; }
        public int Value { get; set; }
    }
}
