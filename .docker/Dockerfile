# start with official ruby docker image as base
FROM ruby:3.3

# set working directory within container
WORKDIR /usr/src/app

# pull in ruby (jekyll) and python (cite process) package info
COPY Gemfile Gemfile.lock _cite/requirements.txt ./

# install ruby packages
RUN VERSION=$(grep -A 1 'BUNDLED WITH' Gemfile.lock | tail -n 1 | xargs); \
    gem install bundler --version ${VERSION} && \
    bundle _${VERSION}_ install

# keep the lockfile resolved for this image's platform outside the mounted repo,
# so the repo's Gemfile.lock (mounted over the working dir at runtime) can't
# disagree with the gems actually installed in the image
RUN mkdir -p /var/bundle && cp Gemfile Gemfile.lock /var/bundle/
ENV BUNDLE_GEMFILE=/var/bundle/Gemfile

# install python
RUN apt update && apt install -y python3 python3-pip

# install python packages
# (debian marks its python as externally managed; this container is the only
# user of it, so installing into it directly is fine)
ENV PIP_BREAK_SYSTEM_PACKAGES=1
RUN python3 -m pip install --no-cache-dir --upgrade --requirement requirements.txt

# install python package for listening for file changes
RUN pip install "watchdog[watchmedo]==3.0.0"

# ports used by jekyll
EXPOSE 4000
EXPOSE 35729

# run jekyll and cite process
COPY .docker/entrypoint.sh /var
CMD [ "/var/entrypoint.sh" ]
