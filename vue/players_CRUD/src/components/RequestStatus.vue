<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise. No changes are needed if you managed to get the component to work properly in the previous exercise.
 -->


 <template> 
  <h2>Request Status</h2>
  <div id="request-status">
    <p>{{ reqStatus }}</p>
  </div>
</template>

<script>
export default {
  props: ["reqStatus"],
};
</script>
