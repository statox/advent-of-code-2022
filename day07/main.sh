#!/usr/bin/env bash
input="./input_test"

rm -rf fs
mkdir fs

while IFS= read -r line
do
    if [[ "$line" =~ 'cd' ]]; then
        command="${line:2}"
        if [ "$command" = "cd /" ]; then
            command="cd fs"
        fi
        $command
    elif [[ "$line" =~ 'dir' ]]; then
        dir="${line:4}"
        mkdir "$dir"
    elif ! [[ "$line" =~ 'ls' ]]; then
        command="fallocate -l $line"
        $command
    fi

done < "$input"
