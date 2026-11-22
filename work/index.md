---
layout: default
title: Work
permalink: /work/
---

# Work

## Projects

<div class="cards">
{% for p in site.data.projects %}
  <div class="card">
    <h3>{{ p.name }}</h3>
    <p>{{ p.summary }}</p>
    <p>
      {% if p.demo != "" %}<a href="{{ p.demo | https://oksana-kozii.github.io/hebrew-vowels-trainer/ }}">Live demo</a>{% endif %}
      {% if p.repo != "" %} · <a href="{{ p.repo }}">Code</a>{% endif %}
      {% if p.case_study != "" %} · <a href="{{ p.case_study | relative_url }}">Case study</a>{% endif %}
    </p>
  </div>
{% endfor %}
</div>

## Case studies

<ul class="list">
{% for item in site.work %}
  <li><a href="{{ item.url | relative_url }}"><strong>{{ item.title }}</strong></a><br>{{ item.summary }}</li>
{% endfor %}
</ul>
