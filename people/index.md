---
title: People
nav:
  order: 1
  tooltip: People
---

<!-- # {% include icon.html icon="fa-solid fa-users" %} PI -->

# Faculty

{% include list.html data="members" component="portrait" filters="role: pi" %}
<!-- {% include list.html data="members" component="portrait" filters="role: ^(?!pi$)" %} -->


# PhD

{% include list.html data="members" component="portrait" filters="role: phd" %}


# Master's and Undergraduate

{% include list.html data="members" component="portrait" filters="group: current, role: master" %}
{% include list.html data="members" component="portrait" filters="group: current, role: undergrad" %}


# Alumni

{% include list.html data="members" component="portrait" filters="group: alumni" %}