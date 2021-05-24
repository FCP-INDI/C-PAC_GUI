#!/bin/bash

aws s3 sync app/dist s3://cpac-dashboard.radiome-lab.org --acl public-read
