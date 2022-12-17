#! /bin/sh

DIR=$(mktemp -d)
echo "building fonts in $DIR"

git clone --depth 1 https://github.com/be5invis/Iosevka.git $DIR
echo "successfully cloned be5invis/Iosevka"

CONFIG="
[buildPlans.iosevka-ll]
family = 'Iosevka LL'
spacing = 'quasi-proportional-extension-only'
serifs = 'sans'
no-cv-ss = true
export-glyph-names = false


[buildPlans.iosevka-ll.weights.regular]
shape = 400
menu  = 400
css   = 400

[buildPlans.iosevka-ll.weights.bold]
shape = 700
menu  = 700
css   = 700


[buildPlans.iosevka-ll.slopes.upright]
angle = 0
shape = 'upright'
menu  = 'upright'
css   = 'normal'

[buildPlans.iosevka-ll.slopes.italic]
angle = 9.4
shape = 'italic'
menu  = 'italic'
css   = 'italic'


[buildPlans.iosevka-ll.widths.normal]
shape = 615
menu  = 5
css   = 'normal'


[buildPlans.iosevka-ll.metric-override]
leading = 1150


[buildPlans.iosevka-ll.variants.design]
f = 'extended'
g = 'double-storey'
t = 'flat-hook'
zero = 'dotted'
"

echo "$CONFIG" > $DIR/private-build-plans.toml

pnpm -C $DIR i
pnpm -C $DIR build -- woff2::iosevka-ll

OUT="built-fonts"
mkdir -p $OUT
cp -R $DIR/dist $OUT
