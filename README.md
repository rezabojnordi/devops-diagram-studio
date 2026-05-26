# HyperNexa DevOps & SRE Diagram Studio v4

Standalone static diagram studio for DevOps and SRE teams.

## New in v2

- Copy / paste with Ctrl+C and Ctrl+V
- Copy and Paste buttons
- Connect mode: click first object, then second object
- Connected arrows stay attached when objects move
- Better visual icons for Server, Database, Cloud, Git, Network, Security, Kubernetes, Firewall, Queue, Monitor, User
- Icon type can be changed from the inspector
- Export PNG, SVG, JSON
- Import JSON
- Local browser autosave

## Deploy

GitHub Pages settings:

- Source: Deploy from a branch
- Branch: main
- Folder: /root

Custom domain:

studio.hypernexa.cloud

## v4 connector behavior

- Connector mode attaches arrows from the edge of the first shape to the edge of the second shape.
- Connected arrows follow both shapes when either shape is moved.
- Connector endpoints are shown as small dots.

## v4 additions

- Resize boxes and icons with the mouse using the resize handle.
- Drag-connect shapes using the connector dot on the selected shape.
- More SRE / DevOps icons: Linux, LXC, Docker, Nginx, Prometheus, Grafana, Terraform, Load Balancer.
