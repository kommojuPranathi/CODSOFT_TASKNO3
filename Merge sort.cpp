
#include<stdio.h>
int a[100];
void merge (int a[], int low, int mid, int high){
	int b[100],j, k, i;
	i = low;
	k = low;
	j = mid+1;
	while((i <= mid) && (j <= high)){
		    if(a[i] <= a[j]){
			b[k] = a[i];
			i = i + 1;
		} else {
			b[k] = a[j];
			j = j + 1;
		}
		k = k + 1;
	}
	if(i > mid){
			while(j<=high){
			b[k] = a[j];
			j = j+1;
			k = k+1;
			}
		}
		else
		 {
			while(i<=mid) {
				b[k] = a[i];
				i = i + 1;
				k = k + 1;
			}
		}
		for(i=low;i<=high;i++){
			a[i] = b[i];
		}
	
		printf("\n");
		for(i=low;i<=high;i++) { 
			printf("%d ",a[i]);
		}
}
	void mergesort(int a[], int low, int high){
		int mid;
		if(low < high){
			mid = (low+high)/2;
			mergesort(a, low, mid);
			mergesort(a, mid+1, high);
			merge(a, low, mid, high);
		}
	}
	int main(){
		int i,n;
		printf("\nEnter number of elements :");
		scanf("%d",&n);
		printf("\nEnter %d element to array \n",n);
		for(i=0;i<n;i++){
			scanf("%d ",&a[i]);
		}
		mergesort(a,0,n-1);
		printf("\nThe sorted list of elements are :");
		
		for(i=0;i<n;i++){
			printf("%d ",a[i]);
		}
		return 0;
	}
		
	
	
