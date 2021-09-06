# Cleanup
watchman watch-del-all
cd android && ./gradlew clean
cd ../
cd ios && pod deintegrate
cd ../
rm -rf node_modules 

# Install dependencies
yarn
npx pod-install
