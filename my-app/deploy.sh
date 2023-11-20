echo "Switching to branch main"
git checkout main

#echo "Building app.."
#npm run build

echo "Deploying files to server"
rsync -avz ../my-app root@157.245.213.41:/var/www/157.245.213.41/Frontend
echo "Done :)"
