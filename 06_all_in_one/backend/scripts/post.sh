echo ""
echo "param1=$1"
curl --data "param1=$1" localhost:4000/results
echo ""
