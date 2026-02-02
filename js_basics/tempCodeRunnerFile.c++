#include <bits/stdc++.h>
using namespace std;
struct Node{
    int val;
    Node* left;
    Node* right;
    Node(int data){
        val=data;
        left=right=NULL;
    }
};
void prepostinTraversal(Node* root,vector<int> &pre,vector<int> &post,vector<int> &in){
    if (!root) return;
    stack<pair<Node*,int>> st;
    st.push({root,1});
    while (!st.empty()){
        auto it=st.top();
        st.pop();
        if (it.second==1){
            pre.push_back(it.first->val);
            it.second++;
            if (it.first->left)
            st.push({it.first->left,1});
        }
        else if (it.second==2){
            in.push_back(it.first->val);
            it.second++;
            if (it.first->right)
            st.push({it.first->right,1});
        }
        else{
            post.push_back(it.first->val);
        }
    }
}
int main(){
    Node* root=new Node(1);
    root->left=new Node(2);
    root->right=new Node(5);
    root->left->left=new Node(3);
    root->left->right=new Node(4);
    root->right->left=new Node(6);
    root->right->right=new Node(7);
    vector<int> pre,post,in;
    prepostinTraversal(root,pre,post,in);
    cout<<"Preorder Traversal : \n";
    for (int i:pre){
        cout<<i<<" ";
    }
    cout<<"\nPostorder Traversal : \n";
    for (int i:post){
        cout<<i<<" ";
    }
    cout<<"\nInorder Traversal : \n";
    for (int i:in){
        cout<<i<<" ";
    }
    cout<<"\n";
    return 0;
}