echo "Switching to branch main"
git checkout main

echo "Building app.."
npm run build

echo "Deploying files to server"
scp -r build/* root@157.245.213.41:/var/www/157.245.213.41/Frontend
ssh root@157.245.213.41 "which npm"
echo "Done :)"
