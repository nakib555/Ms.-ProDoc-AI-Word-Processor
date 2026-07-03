#!/bin/bash
sed -i 's/\.prodoc-editor table\.is-resizing,/.prodoc-editor table,/g' index.css
sed -i 's/\.prodoc-editor table\.is-resizing tbody,/.prodoc-editor table tbody,/g' index.css
sed -i 's/\.prodoc-editor table\.is-resizing tr,/.prodoc-editor table tr,/g' index.css
sed -i 's/\.prodoc-editor table\.is-resizing td,/.prodoc-editor table td,/g' index.css
sed -i 's/\.prodoc-editor table\.is-resizing th/.prodoc-editor table th/g' index.css

cat << 'INNER_EOF' >> index.css

/* Disable transitions during manual drag to prevent lag */
.prodoc-editor table.is-dragging,
.prodoc-editor table.is-dragging tbody,
.prodoc-editor table.is-dragging tr,
.prodoc-editor table.is-dragging td,
.prodoc-editor table.is-dragging th {
  transition: none !important;
}
INNER_EOF
