﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helpers.Pattern.DeleteAbstractFactory.LogCommand
{
    public class LogInvoker
    {
        private ILogCommand command;

        public LogInvoker(ILogCommand command)
        {
            this.command = command;
        }

        void execute()
        {
            command.execute();
        } 
    }
}