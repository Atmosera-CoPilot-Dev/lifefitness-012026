# This bash script uses git to synchronize changes between the local and remote GitHub repository.

echo "Staging all changes for commit..."
git add .

echo "Committing staged changes..."
git commit -m "Synchronizing local changes with remote repository"

echo "Pulling latest changes from remote repository (origin/main)..."
git pull origin main

echo "Pushing local changes to remote repository (origin/main)..."
git push origin main

# Check if the push was successful
if [ $? -eq 0 ]; then
    echo "Changes pushed successfully to the remote repository."
else
    echo "Failed to push changes to the remote repository. Please check for conflicts or errors."
fi





