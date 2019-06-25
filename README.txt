Migrations needed.

To run the project properly you will need to apply the migrations manually.

Once clone is done go to the root directory of your project and run the command to do the migrations:

sudo docker-compose run web python manage.py migrate

After migrations are done, run:

docker-compose up
