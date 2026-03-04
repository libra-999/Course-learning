FROM ubuntu:latest
LABEL authors="libra"

ENTRYPOINT ["top", "-b"]