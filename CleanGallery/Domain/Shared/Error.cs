﻿namespace Domain.Shared
{
    public class Error 
    {
        public Error(string message)
        {
            Message = message;
        }

        public string Message { get; }
    }
}
