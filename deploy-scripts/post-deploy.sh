#!/bin/bash
cd /home/deploy/app
npm install
pm2 reload ecosystem.config.js --env production
pm2 save
