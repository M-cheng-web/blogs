# sh SELF_ENCRYPT/index.sh on docs/encrypt

sed -i "s/\/encrypt\/every/abc/g" docs/.vuepress/config.js


# sh deploy.sh

# git add .
# git commit -m 'feat'
# git push

# sh SELF_ENCRYPT/index.sh off docs/encrypt