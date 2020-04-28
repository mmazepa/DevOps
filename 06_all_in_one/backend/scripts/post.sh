echo ""

if [ $# -eq 0 ] ; then
  echo "No arguments supplied."
  echo ""
  exit 1
fi

if ! [[ "$1" =~ ^[0-9]+$ ]] ; then
  echo "Sorry, positive integers only."
  echo ""
  exit 1
fi

curl --data "param1=$1" localhost:4000/results
echo ""
