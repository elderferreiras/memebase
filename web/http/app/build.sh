(
    echo "Begin build..."

    echo "Deleting existing build at ../../../templates/search/build"
    rm -rf ../../../templates/search/build;

    echo "Installing dependencies"
    yarn install;

    # Ensure the dashboard_beta template directory exists
    mkdir -p ../../../templates/search/build/


    echo "Building..."
    yarn build;
    node contextLoader.js
    cp -R build ../../../templates/search;
    rm -rf build;

    echo "Completed!"
)
