#!/bin/bash
RED="\033[0;31m"
YELLOW="\033[0;33m"
NC="\033[0m"
# validate ignorecase
ignorecase="$(git config core.ignorecase)"
if [ "$ignorecase" == "true" ]
then
  echo -e "请使用\'git config core.ignorecase false\'开启不忽略git大小写 $NC"
  exit 1
fi
