#!/bin/bash
cd /home/kavia/workspace/code-generation/serenity-market-327592-327601/frontend_nextjs_store
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

