<!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> -->

<!-- Modal -->
<div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="eventModalLabel">Add Event</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <input type="hidden" id="startDate">
            <input type="hidden" id="endDate">

            <div class="modal-body">
                {{ csrf_field() }}
                <div class="mb-3">
                    <label for="dayType" class="form-label">Day Type</label>
                    <input type="text" class="form-control" name="dayType" id="dayType" placeholder="" value="">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Staff Number</label>
                    <input type="text" class="form-control" id="staffNumber" placeholder="">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Discription</label>
                    <textarea class="form-control" id="description" rows="3"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" id="save-event" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>