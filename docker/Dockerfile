FROM openjdk:8-jdk-alpine
MAINTAINER Pavel Kachalouski <kachalouski@protonmail.com>

RUN apk update
RUN apk add supervisor
RUN mkdir /etc/supervisor.d
RUN apk add postfix

COPY emiapp/emiapp-*.jar /opt/emiapp/
COPY h2/h2-*.jar /opt/h2/
COPY emiapp.ini /etc/supervisor.d/

EXPOSE 8080
CMD ["supervisord", "-n"]
