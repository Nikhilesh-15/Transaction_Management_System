<script>
async function fetchData() {
  try {
    const response = await fetch("https://mxpertztestapi.onrender.com/api/sciencefiction");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
</script>
